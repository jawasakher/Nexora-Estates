import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_CLERK_PUBLISHABLE_KEY": "pk_test_Y2xhc3NpYy1yYWJiaXQtMzMuY2xlcmsuYWNjb3VudHMuZGV2JA", "VITE_CURRENCY": "USD", "VITE_OWNER_EMAILS": "jwasakher@gmail.com,jwasakhergmail.com"};const StrictMode = __vite__cjsImport0_react["StrictMode"];const createRoot = __vite__cjsImport1_reactDom_client["createRoot"];const _jsxDEV = __vite__cjsImport13_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=c34f2fe7";
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=d3bda796";
import "/src/index.css";
import App from "/src/App.jsx";
import { BrowserRouter } from "/node_modules/.vite/deps/react-router-dom.js?v=4f582c31";
import { AppContextProvider } from "/src/context/AppContext.jsx";
import { ClerkProvider } from "/node_modules/.vite/deps/@clerk_clerk-react.js?v=1acc5bcc";
import ErrorBoundary from "/src/components/ErrorBoundary.jsx";
import { QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=6b10f8ee";
import { queryClient } from "/src/query/queryClient.js";
import { MDXProvider } from "/node_modules/.vite/deps/@mdx-js_react.js?v=14208315";
import mdxComponents from "/src/components/mdx/MDXComponents.jsx";
import { I18nProvider } from "/src/i18n/I18nContext.jsx";
var _jsxFileName = "C:/Users/JAWA/Downloads/Nexora-Estates/src/main.jsx";
import __vite__cjsImport13_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c34f2fe7";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env file");
}
createRoot(document.getElementById("root")).render(/* @__PURE__ */ _jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ _jsxDEV(ClerkProvider, {
	publishableKey: PUBLISHABLE_KEY,
	children: /* @__PURE__ */ _jsxDEV(BrowserRouter, { children: /* @__PURE__ */ _jsxDEV(MDXProvider, {
		components: mdxComponents,
		children: /* @__PURE__ */ _jsxDEV(QueryClientProvider, {
			client: queryClient,
			children: /* @__PURE__ */ _jsxDEV(I18nProvider, { children: /* @__PURE__ */ _jsxDEV(AppContextProvider, { children: /* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 17
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 15
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 26,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 7
	}, this)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 23,
	columnNumber: 5
}, this) }, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 22,
	columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTztBQUNQLE9BQU8sU0FBUztBQUNoQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHFCQUFxQjtBQUM5QixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLG1CQUFtQjtBQUM1QixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLG9CQUFvQjs7OztBQUc3QixNQUFNLGtCQUFnQixPQUFPLEtBQUssSUFBSTtBQUN0QyxJQUFJLENBQUMsaUJBQWlCO0FBQ3BCLE9BQU0sSUFBSSxNQUFNLGtEQUFrRDs7QUFHcEUsV0FBVyxTQUFTLGVBQWUsT0FBTyxDQUFDLENBQUMsT0FDMUMsd0JBQUMsZUFBRCxZQUNFLHdCQUFDLGVBQUQ7Q0FBZSxnQkFBZ0I7V0FDN0Isd0JBQUMsZUFBRCxZQUNFLHdCQUFDLGFBQUQ7RUFBYSxZQUFZO1lBQ3ZCLHdCQUFDLHFCQUFEO0dBQXFCLFFBQVE7YUFDM0Isd0JBQUMsY0FBRCxZQUNFLHdCQUFDLG9CQUFELFlBQ0Usd0JBQUMsS0FBRCxFQUFPOzs7O2FBQ1k7Ozs7YUFDUjs7Ozs7R0FDSzs7Ozs7RUFDVjs7OztXQUNBOzs7OztDQUNGOzs7O1VBQ0Y7Ozs7U0FDakIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsibWFpbi5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RyaWN0TW9kZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnXG5pbXBvcnQgJy4vaW5kZXguY3NzJ1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qc3gnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEFwcENvbnRleHRQcm92aWRlciB9IGZyb20gJy4vY29udGV4dC9BcHBDb250ZXh0LmpzeCdcbmltcG9ydCB7IENsZXJrUHJvdmlkZXIgfSBmcm9tICdAY2xlcmsvY2xlcmstcmVhY3QnXG5pbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tICcuL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3gnXG5pbXBvcnQgeyBRdWVyeUNsaWVudFByb3ZpZGVyIH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5J1xuaW1wb3J0IHsgcXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5L3F1ZXJ5Q2xpZW50LmpzJ1xuaW1wb3J0IHsgTURYUHJvdmlkZXIgfSBmcm9tICdAbWR4LWpzL3JlYWN0J1xuaW1wb3J0IG1keENvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL21keC9NRFhDb21wb25lbnRzLmpzeCdcbmltcG9ydCB7IEkxOG5Qcm92aWRlciB9IGZyb20gJy4vaTE4bi9JMThuQ29udGV4dC5qc3gnXG5cbi8vIEltcG9ydCB5b3VyIHB1Ymxpc2hhYmxlIGtleVxuY29uc3QgUFVCTElTSEFCTEVfS0VZPWltcG9ydC5tZXRhLmVudi5WSVRFX0NMRVJLX1BVQkxJU0hBQkxFX0tFWVxuaWYgKCFQVUJMSVNIQUJMRV9LRVkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdBZGQgeW91ciBDbGVyayBQdWJsaXNoYWJsZSBLZXkgdG8gdGhlIC5lbnYgZmlsZScpXG59XG5cbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSkucmVuZGVyKFxuICA8RXJyb3JCb3VuZGFyeT5cbiAgICA8Q2xlcmtQcm92aWRlciBwdWJsaXNoYWJsZUtleT17UFVCTElTSEFCTEVfS0VZfT5cbiAgICAgIDxCcm93c2VyUm91dGVyPlxuICAgICAgICA8TURYUHJvdmlkZXIgY29tcG9uZW50cz17bWR4Q29tcG9uZW50c30+XG4gICAgICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICAgICAgICA8STE4blByb3ZpZGVyPlxuICAgICAgICAgICAgICA8QXBwQ29udGV4dFByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgICAgPC9BcHBDb250ZXh0UHJvdmlkZXI+XG4gICAgICAgICAgICA8L0kxOG5Qcm92aWRlcj5cbiAgICAgICAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICAgICAgIDwvTURYUHJvdmlkZXI+XG4gICAgICA8L0Jyb3dzZXJSb3V0ZXI+XG4gICAgPC9DbGVya1Byb3ZpZGVyPlxuICA8L0Vycm9yQm91bmRhcnk+XG4pO1xuXG4gICAgIl19