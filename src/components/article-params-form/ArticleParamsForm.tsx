import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacing } from 'src/ui/spacing';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	isOpen: boolean;
	formState: ArticleStateType;
	onChange: (state: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
	onClose: () => void;
	onToggle: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	formState,
	onChange,
	onApply,
	onReset,
	onClose,
	onToggle,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
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
						selected={formState.fontFamilyOption}
						onChange={(option) => onChange({ fontFamilyOption: option })}
					/>
					<Spacing size={50} />
					<RadioGroup
						title={'Размер Шрифта'}
						name={'font-size'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => onChange({ fontSizeOption: option })}
					/>
					<Spacing size={50} />
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => onChange({ fontColor: option })}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => onChange({ backgroundColor: option })}
					/>
					<Spacing size={50} />
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => onChange({ contentWidth: option })}
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
