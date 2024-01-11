// import { ref, provide, inject, onMounted, App, Ref } from "vue";
// import i18next, { TFunction } from "i18next";
// // import translations from '@/i18n';

// const i18nKey = Symbol();

// interface I18nContext {
//   locale: Ref<string>;
//   i18n: TFunction;
// }

// i18next.init({
//   lng: "eng",
//   fallbackLng: "en",
//   //   resources: translations
// });

// export function useI18n() {
//   const locale = ref("eng");
//   const i18n = i18next;

//   // You might want to do additional setup here

//   // If you need some logic to run when the component is mounted
//   onMounted(() => {
//     // ...
//   });

//   provide(i18nKey, { locale, i18n } as I18nContext);
// }

// export function injectI18n() {
//   const i18nContext = inject(i18nKey);
//   if (!i18nContext) {
//     throw new Error("useI18n must be called before using injectI18n");
//   }
//   return i18nContext;
// }

// export default {
//   install(app: App) {
//     app.config.globalProperties.$t = function (key: any, options: any) {
//       const i18nContext = injectI18n();
//       const { i18n } = i18nContext;

//       // Your translation logic here

//       return i18n.t(key, options);
//     };

//     app.config.globalProperties.$tExists = function (key: any) {
//       const i18nContext = injectI18n();
//       const { i18n } = i18nContext;

//       return i18n.exists(key);
//     };

//     // Add more methods as needed

//     // Optionally, you can also use provide to expose i18n and locale to other components
//     provide(i18nKey, { locale: ref("eng"), i18n });
//   },
// };
