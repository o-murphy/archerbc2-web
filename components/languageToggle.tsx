import { useState } from "react";
import { md3PaperIconSource } from "./icons/md3PaperIcons";
import { ToolTipIconButton } from "./iconButtonWithTooltip";
import { useTranslation } from "react-i18next";


export const LanguageToggle = () => {
    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState<'en' | 'ua'>(() => i18n.language === 'ua' ? 'ua' : 'en');

    const toggleLanguage = async () => {
        const newLang = currentLang === 'en' ? 'ua' : 'en';
        await i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <ToolTipIconButton
            tooltip={t(`languageToggle.SwitchTo_${currentLang === 'en' ? 'ua' : 'en'}`)}
            icon={md3PaperIconSource({ name: "translate" })}
            onPress={toggleLanguage}
        />
    );
};