export interface SettingsData {
  name: string;
  option: Array<string>;
}

export const setData: Array<SettingsData> = [
  { name: 'Тема', option: ['Тёмная', 'Светлая'] },
  { name: 'Анимация', option: ['Выключить', 'Включить'] },
  { name: 'Прогресс', option: ['Обнулить прогресс'] },
  { name: 'Звук', option: ['Выключить', 'Включить'] },
];
