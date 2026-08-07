import { useEffect, useRef, useState } from 'react';

import { PROFILE_IMAGE_ERROR_MESSAGE } from '@/shared/constants/profileImageConstants';
import { isValidProfileImage } from '@/shared/utils/profileImageValidation';
import {
  NICKNAME_MAX_LENGTH,
  PROFILE_TOTAL_STEPS,
} from '../constants/loginConstants';
import type {
  AgeGroupValueTypes,
  BowelRhythmValueTypes,
  GenderValueTypes,
  ProfileInputValueTypes,
  ProfileStepTypes,
} from '../types/loginTypes';

interface UseProfileInputParameterTypes {
  onComplete: (value: ProfileInputValueTypes) => void;
  onBackToSocial: () => void;
}

const revokeProfileImagePreviewUrl = (previewUrl: string | null) => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
};

const useProfileInput = ({
  onComplete,
  onBackToSocial,
}: UseProfileInputParameterTypes) => {
  const [step, setStep] = useState<ProfileStepTypes>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [nickname, setNickname] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<
    string | null
  >(null);
  const [profileImageErrorMessage, setProfileImageErrorMessage] = useState<
    string | null
  >(null);
  const [bowelRhythm, setBowelRhythm] = useState<BowelRhythmValueTypes | null>(
    null,
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroupValueTypes | null>(null);
  const [gender, setGender] = useState<GenderValueTypes | null>(null);
  const [isMenstrualCycleStepVisible, setIsMenstrualCycleStepVisible] =
    useState(false);
  const [shouldTrackMenstrualCycle, setShouldTrackMenstrualCycle] =
    useState(false);
  const profileImagePreviewUrlRef = useRef<string | null>(null);

  const isNicknameValid =
    nickname.trim().length > 0 && nickname.length <= NICKNAME_MAX_LENGTH;
  const isProfileImageValid = profileImageErrorMessage === null;
  const isAgeGenderValid = Boolean(ageGroup && gender);

  const handleNextButtonClick = () => {
    setStep((prev) =>
      prev < PROFILE_TOTAL_STEPS ? ((prev + 1) as ProfileStepTypes) : prev,
    );
  };

  const handleBackButtonClick = () => {
    if (isMenstrualCycleStepVisible) {
      setIsMenstrualCycleStepVisible(false);
      return;
    }

    if (step === 1) {
      onBackToSocial();
      return;
    }

    setStep((prev) => (prev - 1) as ProfileStepTypes);
  };

  const handleProfileImageChange = (file: File) => {
    if (!isValidProfileImage(file)) {
      setProfileImageErrorMessage(PROFILE_IMAGE_ERROR_MESSAGE);
      return;
    }

    const nextProfileImagePreviewUrl = URL.createObjectURL(file);

    revokeProfileImagePreviewUrl(profileImagePreviewUrlRef.current);
    profileImagePreviewUrlRef.current = nextProfileImagePreviewUrl;
    setProfileImageFile(file);
    setProfileImagePreviewUrl(nextProfileImagePreviewUrl);
    setProfileImageErrorMessage(null);
  };

  const completeInput = (shouldTrack: boolean) => {
    revokeProfileImagePreviewUrl(profileImagePreviewUrlRef.current);
    profileImagePreviewUrlRef.current = null;
    setProfileImagePreviewUrl(null);
    setShouldTrackMenstrualCycle(shouldTrack);
    setIsCompleted(true);
  };

  const handleAgeGenderNextButtonClick = () => {
    if (gender === 'male') {
      completeInput(false);
      return;
    }

    setIsMenstrualCycleStepVisible(true);
  };

  const handleMenstrualCycleAgreeButtonClick = () => {
    completeInput(true);
  };

  const handleMenstrualCycleSkipButtonClick = () => {
    completeInput(false);
  };

  const handleGoHomeButtonClick = () => {
    onComplete({
      nickname,
      profileImageFile,
      bowelRhythm,
      ageGroup,
      gender,
      shouldTrackMenstrualCycle,
    });
  };

  useEffect(() => {
    return () => {
      revokeProfileImagePreviewUrl(profileImagePreviewUrlRef.current);
    };
  }, []);

  return {
    step,
    isCompleted,
    nickname,
    profileImagePreviewUrl,
    profileImageErrorMessage,
    bowelRhythm,
    ageGroup,
    gender,
    isMenstrualCycleStepVisible,
    isNicknameValid,
    isProfileImageValid,
    isAgeGenderValid,
    setNickname,
    setBowelRhythm,
    setAgeGroup,
    setGender,
    handleNextButtonClick,
    handleBackButtonClick,
    handleProfileImageChange,
    handleAgeGenderNextButtonClick,
    handleMenstrualCycleAgreeButtonClick,
    handleMenstrualCycleSkipButtonClick,
    handleGoHomeButtonClick,
  };
};

export default useProfileInput;
