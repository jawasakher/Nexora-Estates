import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/i18n/I18nContext.jsx");const createContext = __vite__cjsImport0_react["createContext"]; const useContext = __vite__cjsImport0_react["useContext"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=c34f2fe7";
import { supportedLanguages, translations } from "/src/i18n/translations.js";
var _jsxFileName = "C:/Users/JAWA/Downloads/Nexora-Estates/src/i18n/I18nContext.jsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c34f2fe7";
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
export const I18nContext = createContext(null);
_c = I18nContext;
const DEFAULT_LANGUAGE = "en";
const getByPath = (source, path) => {
	return path.split(".").reduce((value, key) => value && key in value ? value[key] : undefined, source);
};
const interpolate = (template, values = {}) => {
	if (typeof template !== "string") return template;
	return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => key in values ? String(values[key]) : "");
};
const getInitialLanguage = () => {
	try {
		const saved = localStorage.getItem("site-language");
		if (saved && supportedLanguages.includes(saved)) {
			return saved;
		}
	} catch {}
	const browserLang = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : DEFAULT_LANGUAGE;
	return browserLang.startsWith("ar") ? "ar" : DEFAULT_LANGUAGE;
};
export const I18nProvider = ({ children }) => {
	_s();
	const [language, setLanguageState] = useState(getInitialLanguage);
	const setLanguage = (nextLanguage) => {
		if (!supportedLanguages.includes(nextLanguage)) return;
		setLanguageState(nextLanguage);
	};
	const t = (key, values = {}) => {
		const current = getByPath(translations[language], key);
		const fallback = getByPath(translations[DEFAULT_LANGUAGE], key);
		const value = current ?? fallback ?? key;
		return interpolate(value, values);
	};
	useEffect(() => {
		try {
			localStorage.setItem("site-language", language);
		} catch {}
		const direction = language === "ar" ? "rtl" : "ltr";
		document.documentElement.lang = language;
		document.documentElement.dir = direction;
		document.body.setAttribute("dir", direction);
	}, [language]);
	const value = useMemo(() => ({
		language,
		setLanguage,
		supportedLanguages,
		isRTL: language === "ar",
		t
	}), [language]);
	return /* @__PURE__ */ _jsxDEV(I18nContext.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 10
	}, this);
};
_s(I18nProvider, "zsE4DK1GDq4dRlkO6tLLcxdUn/Q=");
_c2 = I18nProvider;
export const useI18n = () => {
	_s2();
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error("useI18n must be used within an I18nProvider");
	}
	return context;
};
_s2(useI18n, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c, _c2;
$RefreshReg$(_c, "I18nContext");
$RefreshReg$(_c2, "I18nProvider");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/i18n/I18nContext.jsx?t=1786201784319";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/JAWA/Downloads/Nexora-Estates/src/i18n/I18nContext.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/JAWA/Downloads/Nexora-Estates/src/i18n/I18nContext.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/JAWA/Downloads/Nexora-Estates/src/i18n/I18nContext.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxlQUFlLFlBQVksV0FBVyxTQUFTLGdCQUFnQjtBQUN4RSxTQUFTLG9CQUFvQixvQkFBb0I7Ozs7QUFFakQsT0FBTyxNQUFNLGNBQWMsY0FBYyxLQUFLOztBQUU5QyxNQUFNLG1CQUFtQjtBQUV6QixNQUFNLGFBQWEsUUFBUSxTQUFTO0FBQ2xDLFFBQU8sS0FBSyxNQUFNLElBQUksQ0FBQyxRQUFRLE9BQU8sUUFBUyxTQUFTLE9BQU8sUUFBUSxNQUFNLE9BQU8sV0FBWSxPQUFPOztBQUd6RyxNQUFNLGVBQWUsVUFBVSxTQUFTLEVBQUUsS0FBSztBQUM3QyxLQUFJLE9BQU8sYUFBYSxTQUFVLFFBQU87QUFDekMsUUFBTyxTQUFTLFFBQVEseUJBQXlCLEdBQUcsUUFBUyxPQUFPLFNBQVMsT0FBTyxPQUFPLEtBQUssR0FBRyxHQUFJOztBQUd6RyxNQUFNLDJCQUEyQjtBQUMvQixLQUFJO0VBQ0YsTUFBTSxRQUFRLGFBQWEsUUFBUSxnQkFBZ0I7QUFDbkQsTUFBSSxTQUFTLG1CQUFtQixTQUFTLE1BQU0sRUFBRTtBQUMvQyxVQUFPOztTQUVIO0NBSVIsTUFBTSxjQUFjLE9BQU8sY0FBYyxjQUFjLFVBQVUsU0FBUyxhQUFhLEdBQUc7QUFDMUYsUUFBTyxZQUFZLFdBQVcsS0FBSyxHQUFHLE9BQU87O0FBRy9DLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxlQUFlOztDQUM1QyxNQUFNLENBQUMsVUFBVSxvQkFBb0IsU0FBUyxtQkFBbUI7Q0FFakUsTUFBTSxlQUFlLGlCQUFpQjtBQUNwQyxNQUFJLENBQUMsbUJBQW1CLFNBQVMsYUFBYSxDQUFFO0FBQ2hELG1CQUFpQixhQUFhOztDQUdoQyxNQUFNLEtBQUssS0FBSyxTQUFTLEVBQUUsS0FBSztFQUM5QixNQUFNLFVBQVUsVUFBVSxhQUFhLFdBQVcsSUFBSTtFQUN0RCxNQUFNLFdBQVcsVUFBVSxhQUFhLG1CQUFtQixJQUFJO0VBQy9ELE1BQU0sUUFBUSxXQUFXLFlBQVk7QUFDckMsU0FBTyxZQUFZLE9BQU8sT0FBTzs7QUFHbkMsaUJBQWdCO0FBQ2QsTUFBSTtBQUNGLGdCQUFhLFFBQVEsaUJBQWlCLFNBQVM7VUFDekM7RUFJUixNQUFNLFlBQVksYUFBYSxPQUFPLFFBQVE7QUFDOUMsV0FBUyxnQkFBZ0IsT0FBTztBQUNoQyxXQUFTLGdCQUFnQixNQUFNO0FBQy9CLFdBQVMsS0FBSyxhQUFhLE9BQU8sVUFBVTtJQUMzQyxDQUFDLFNBQVMsQ0FBQztDQUVkLE1BQU0sUUFBUSxlQUNMO0VBQUU7RUFBVTtFQUFhO0VBQW9CLE9BQU8sYUFBYTtFQUFNO0VBQUcsR0FDakYsQ0FBQyxTQUFTLENBQ1g7QUFFRCxRQUFPLHdCQUFDLFlBQVksVUFBYjtFQUE2QjtFQUFRO0VBQWdDOzs7Ozs7OztBQUc5RSxPQUFPLE1BQU0sZ0JBQWdCOztDQUMzQixNQUFNLFVBQVUsV0FBVyxZQUFZO0FBQ3ZDLEtBQUksQ0FBQyxTQUFTO0FBQ1osUUFBTSxJQUFJLE1BQU0sOENBQThDOztBQUVoRSxRQUFPIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkkxOG5Db250ZXh0LmpzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBzdXBwb3J0ZWRMYW5ndWFnZXMsIHRyYW5zbGF0aW9ucyB9IGZyb20gJy4vdHJhbnNsYXRpb25zLmpzJ1xuXG5leHBvcnQgY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0KG51bGwpXG5cbmNvbnN0IERFRkFVTFRfTEFOR1VBR0UgPSAnZW4nXG5cbmNvbnN0IGdldEJ5UGF0aCA9IChzb3VyY2UsIHBhdGgpID0+IHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+ICh2YWx1ZSAmJiBrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogdW5kZWZpbmVkKSwgc291cmNlKVxufVxuXG5jb25zdCBpbnRlcnBvbGF0ZSA9ICh0ZW1wbGF0ZSwgdmFsdWVzID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHJldHVybiB0ZW1wbGF0ZVxuICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFx7XFx7XFxzKihcXHcrKVxccypcXH1cXH0vZywgKF8sIGtleSkgPT4gKGtleSBpbiB2YWx1ZXMgPyBTdHJpbmcodmFsdWVzW2tleV0pIDogJycpKVxufVxuXG5jb25zdCBnZXRJbml0aWFsTGFuZ3VhZ2UgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l0ZS1sYW5ndWFnZScpXG4gICAgaWYgKHNhdmVkICYmIHN1cHBvcnRlZExhbmd1YWdlcy5pbmNsdWRlcyhzYXZlZCkpIHtcbiAgICAgIHJldHVybiBzYXZlZFxuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gbG9jYWxTdG9yYWdlIGNhbiBiZSB1bmF2YWlsYWJsZSBpbiByZXN0cmljdGl2ZSBlbnZpcm9ubWVudHMuXG4gIH1cblxuICBjb25zdCBicm93c2VyTGFuZyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCkgOiBERUZBVUxUX0xBTkdVQUdFXG4gIHJldHVybiBicm93c2VyTGFuZy5zdGFydHNXaXRoKCdhcicpID8gJ2FyJyA6IERFRkFVTFRfTEFOR1VBR0Vcbn1cblxuZXhwb3J0IGNvbnN0IEkxOG5Qcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW2xhbmd1YWdlLCBzZXRMYW5ndWFnZVN0YXRlXSA9IHVzZVN0YXRlKGdldEluaXRpYWxMYW5ndWFnZSlcblxuICBjb25zdCBzZXRMYW5ndWFnZSA9IChuZXh0TGFuZ3VhZ2UpID0+IHtcbiAgICBpZiAoIXN1cHBvcnRlZExhbmd1YWdlcy5pbmNsdWRlcyhuZXh0TGFuZ3VhZ2UpKSByZXR1cm5cbiAgICBzZXRMYW5ndWFnZVN0YXRlKG5leHRMYW5ndWFnZSlcbiAgfVxuXG4gIGNvbnN0IHQgPSAoa2V5LCB2YWx1ZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRCeVBhdGgodHJhbnNsYXRpb25zW2xhbmd1YWdlXSwga2V5KVxuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0QnlQYXRoKHRyYW5zbGF0aW9uc1tERUZBVUxUX0xBTkdVQUdFXSwga2V5KVxuICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/PyBmYWxsYmFjayA/PyBrZXlcbiAgICByZXR1cm4gaW50ZXJwb2xhdGUodmFsdWUsIHZhbHVlcylcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaXRlLWxhbmd1YWdlJywgbGFuZ3VhZ2UpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgcGVyc2lzdGVuY2UgZXJyb3JzIGFuZCBjb250aW51ZSBydW50aW1lIGJlaGF2aW9yLlxuICAgIH1cblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGxhbmd1YWdlID09PSAnYXInID8gJ3J0bCcgOiAnbHRyJ1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nID0gbGFuZ3VhZ2VcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyID0gZGlyZWN0aW9uXG4gICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RpcicsIGRpcmVjdGlvbilcbiAgfSwgW2xhbmd1YWdlXSlcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHsgbGFuZ3VhZ2UsIHNldExhbmd1YWdlLCBzdXBwb3J0ZWRMYW5ndWFnZXMsIGlzUlRMOiBsYW5ndWFnZSA9PT0gJ2FyJywgdCB9KSxcbiAgICBbbGFuZ3VhZ2VdLFxuICApXG5cbiAgcmV0dXJuIDxJMThuQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0kxOG5Db250ZXh0LlByb3ZpZGVyPlxufVxuXG5leHBvcnQgY29uc3QgdXNlSTE4biA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoSTE4bkNvbnRleHQpXG4gIGlmICghY29udGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlSTE4biBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEkxOG5Qcm92aWRlcicpXG4gIH1cbiAgcmV0dXJuIGNvbnRleHRcbn0iXX0=