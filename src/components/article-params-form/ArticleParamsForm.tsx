import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacing } from 'src/ui/spacing';
import { Text } from 'src/ui/text';
import { useCloseOnOutsideClickOrEsc } from 'components/article-params-form/hooks/useCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	changeArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	changeArticleState,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLElement>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentFormState, setCurrentFormState] =
		useState<ArticleStateType>(currentArticleState);

	const closeForm = () => {
		setIsFormOpen(false);
	};

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isFormOpen,
		elementRef: containerRef,
		onClose: () => closeForm(),
	});

	const toggleForm = () => {
		setIsFormOpen((prevState) => !prevState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		changeArticleState(currentFormState);
		closeForm();
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentFormState(defaultArticleState);
		changeArticleState(defaultArticleState);
	};

	const updateFormField = (field: keyof typeof currentFormState) => {
		return (value: OptionType) => {
			setCurrentFormState({ ...currentFormState, [field]: value });
		};
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={containerRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h3' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={currentFormState.fontFamilyOption}
						onChange={updateFormField('fontFamilyOption')}
					/>
					<Spacing size={50} />
					<RadioGroup
						title={'Размер Шрифта'}
						name={'font-size'}
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Spacing size={50} />
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={currentFormState.fontColor}
						onChange={updateFormField('fontColor')}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={currentFormState.backgroundColor}
						onChange={updateFormField('backgroundColor')}
					/>
					<Spacing size={50} />
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={currentFormState.contentWidth}
						onChange={updateFormField('contentWidth')}
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
