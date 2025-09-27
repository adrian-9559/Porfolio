declare module "@heroui/react" {
	import * as React from "react";

	export type SelectProps<T = any> = React.ComponentPropsWithoutRef<"div"> & {
		value?: string;
		onValueChange?: (value: string) => void;
		children?: React.ReactNode;
		className?: string;
	} & React.HTMLAttributes<HTMLDivElement>;

	export const Select: React.FC<SelectProps>;
	export const SelectItem: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>>;

	const _default: any;
	export default _default;
}
