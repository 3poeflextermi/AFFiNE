import { RadioButton, RadioButtonGroup, Switch } from '@affine/component';
import { SettingHeader } from '@affine/component/setting-components';
import { SettingRow } from '@affine/component/setting-components';
import { SettingWrapper } from '@affine/component/setting-components';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import {
  type AppSetting,
  useAppSetting,
  windowFrameStyleOptions,
} from '../../../../../atoms/settings';
import { LanguageMenu } from '../../../language-menu';
import { DateFormatSetting } from './date-format-setting';
import { settingWrapper } from './style.css';

export const ThemeSettings = () => {
  const t = useAFFiNEI18N();
  const { setTheme, theme } = useTheme();

  return (
    <RadioButtonGroup
      className={settingWrapper}
      defaultValue={theme}
      onValueChange={useCallback(
        (value: string) => {
          setTheme(value);
        },
        [setTheme]
      )}
    >
      <RadioButton value="system" data-testid="system-theme-trigger">
        {t['system']()}
      </RadioButton>
      <RadioButton value="light" data-testid="light-theme-trigger">
        {t['light']()}
      </RadioButton>
      <RadioButton value="dark" data-testid="dark-theme-trigger">
        {t['dark']()}
      </RadioButton>
    </RadioButtonGroup>
  );
};

export const AppearanceSettings = () => {
  const t = useAFFiNEI18N();

  const [appSettings, setAppSettings] = useAppSetting();
  const changeSwitch = useCallback(
    (key: keyof AppSetting, checked: boolean) => {
      setAppSettings({ [key]: checked });
    },
    [setAppSettings]
  );
  return (
    <>
      <SettingHeader
        title={t['Appearance Settings']()}
        subtitle={t['Customize your  AFFiNE Appearance']()}
      />

      <SettingWrapper title={t['Theme']()}>
        <SettingRow
          name={t['Color Scheme']()}
          desc={t['Choose your color scheme']()}
        >
          <ThemeSettings />
        </SettingRow>
        <SettingRow
          name={t['Display Language']()}
          desc={t['Select the language for the interface.']()}
        >
          <div className={settingWrapper}>
            <LanguageMenu />
          </div>
        </SettingRow>
        {runtimeConfig.enableNewSettingUnstableApi && environment.isDesktop ? (
          <SettingRow
            name={t['Client Border Style']()}
            desc={t['Customize the appearance of the client.']()}
          >
            <Switch
              checked={appSettings.clientBorder}
              onChange={checked => changeSwitch('clientBorder', checked)}
            />
          </SettingRow>
        ) : null}

        <SettingRow
          name={t['Full width Layout']()}
          desc={t['Maximum display of content within a page.']()}
        >
          <Switch
            data-testid="full-width-layout-trigger"
            checked={appSettings.fullWidthLayout}
            onChange={checked => changeSwitch('fullWidthLayout', checked)}
          />
        </SettingRow>
        {runtimeConfig.enableNewSettingUnstableApi && environment.isDesktop ? (
          <SettingRow
            name={t['Window frame style']()}
            desc={t['Customize appearance of Windows Client.']()}
          >
            <RadioButtonGroup
              className={settingWrapper}
              defaultValue={appSettings.windowFrameStyle}
              onValueChange={(value: AppSetting['windowFrameStyle']) => {
                setAppSettings({ windowFrameStyle: value });
              }}
            >
              {windowFrameStyleOptions.map(option => {
                return (
                  <RadioButton value={option} key={option}>
                    {t[option]()}
                  </RadioButton>
                );
              })}
            </RadioButtonGroup>
          </SettingRow>
        ) : null}
      </SettingWrapper>
      {runtimeConfig.enableNewSettingUnstableApi ? (
        <SettingWrapper title={t['Date']()}>
          <SettingRow
            name={t['Date Format']()}
            desc={t['Customize your date style.']()}
          >
            <div className={settingWrapper}>
              <DateFormatSetting />
            </div>
          </SettingRow>
          <SettingRow
            name={t['Start Week On Monday']()}
            desc={t['By default, the week starts on Sunday.']()}
          >
            <Switch
              checked={appSettings.startWeekOnMonday}
              onChange={checked => changeSwitch('startWeekOnMonday', checked)}
            />
          </SettingRow>
        </SettingWrapper>
      ) : null}

      {environment.isDesktop ? (
        <SettingWrapper title={t['Sidebar']()}>
          <SettingRow
            name={t['Disable the noise background on the sidebar']()}
            desc={t['None yet']()}
          >
            <Switch
              checked={appSettings.disableNoisyBackground}
              onChange={checked =>
                changeSwitch('disableNoisyBackground', checked)
              }
            />
          </SettingRow>
          <SettingRow
            name={t['Disable the blur sidebar']()}
            desc={t['None yet']()}
          >
            <Switch
              checked={!appSettings.disableBlurBackground}
              onChange={checked =>
                changeSwitch('disableBlurBackground', !checked)
              }
            />
          </SettingRow>
        </SettingWrapper>
      ) : null}
    </>
  );
};
