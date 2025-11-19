import i18n from "../i18n/i18n";
import hy  from "../i18n/locales/hy/translation.json";

const tv = (key: keyof typeof hy["errors"], params?: any):string =>
  i18n.t(`errors.${key}`, params) as string

export default tv;