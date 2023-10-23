import { Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/utils/ErrorBoundary.jsx";
import Home from "./layouts/Home.jsx";

const App = () => {
	return (
		<ThemeProvider>
			<ErrorBoundary>
				<Suspense fallback={<div>Loading...</div>}>
					<div className="App">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/headphones" element={<div>Headphones</div>} />
							<Route path="/speakers" element={<div>Speakers</div>} />
							<Route path="/earphones" element={<div>Earphones</div>} />
							<Route path="/cart" element={<div>Cart</div>} />
						</Routes>
					</div>
				</Suspense>
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default App;
