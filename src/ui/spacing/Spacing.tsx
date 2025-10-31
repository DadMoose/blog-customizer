import { CSSProperties } from 'react';

type SpacingSize = 4 | 24 | 50 | 90 | 207;

type SpacingProps = {
	size?: SpacingSize;
};

export const Spacing = ({ size }: SpacingProps) => {
	const spacingStyle: CSSProperties = {
		height: `${size}px`,
	};

	return <div aria-hidden style={spacingStyle}></div>;
};
