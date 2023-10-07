import { Suspense } from "react";
import ErrorBoundary from "./components/utils/ErrorBoundary";

const App = () => {
	return (
		<ErrorBoundary>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="App">
					<h1>Hello World</h1>
				</div>
			</Suspense>
		</ErrorBoundary>
	);
};

export default App;
