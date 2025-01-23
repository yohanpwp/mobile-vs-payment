import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from "expo-localization";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import your translations here
import en from './locales/en.json'; // English
import th from './locales/th.json'; // Thai
// Add more languages if needed

// Detect the device's language
const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
  
    if (!savedLanguage) {
      let localLanguage = Localization.getLocales();
      savedLanguage = localLanguage[0].languageCode;
    }
  
    i18n.use(initReactI18next).init({
      compatibilityJSON: "v3",
      resources: {
        en: {
          translation: en,
        },
        th: {
          translation: th,
        }
      },
      lng: savedLanguage,
      fallbackLng: "th",
      interpolation: {
        escapeValue: false,
      },
    });
  };
  
  initI18n();
  
  export default i18n;
