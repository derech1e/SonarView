import {HTMLInputTypeAttribute} from "react";

export function InputField({id, label, required, value, type, ...props}: { id: string, label: string, required: boolean, value?: string | undefined, type: HTMLInputTypeAttribute, [key: string]: any}) {
    return (
        <div className={"flex flex-col w-full gap-4 space-between"}>
            <label htmlFor={id} className="text-sm font-medium">{label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input id={id}
                   required={required}
                   className="shadow-sm focus:ring-red-500 px-4 py-2 focus:outline-red-500 block w-full sm:text-sm border border-gray-200 dark:border-gray-500 rounded-md accent-red-600"
                   type={type} value={value} name={id} {...props} />
        </div>
    );
}