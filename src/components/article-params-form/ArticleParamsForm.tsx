import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType } from 'src/constants/articleProps';
import { FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';

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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
