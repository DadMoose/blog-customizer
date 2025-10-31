import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};
	const handleCloseSidebar = () => {
		setIsSidebarOpen(false);
	};
	const handleApply = () => {
		setArticleState(formState);
		handleCloseSidebar();
	};
	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};
	const handleFormChange = (updatedState: Partial<ArticleStateType>) => {
		setFormState((prev) => ({ ...prev, ...updatedState }));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				formState={formState}
				onChange={handleFormChange}
				onApply={handleApply}
				onReset={handleReset}
				onClose={handleCloseSidebar}
				onToggle={handleToggleSidebar}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
