export function MediumBox({heading, subheading, value}: { heading: string, subheading: string, value: string | number }) {
    return (
        <div className="flex flex-col rounded-lg p-6 gap-2 border w-full border-gray-200">
            <div className="flex flex-col gap-1">
                <h2 className="font-medium text-lg dark:text-white">{heading}</h2>
                <p className="text-sm text-gray-600 dark:text-dark-text">{subheading}</p>
            </div>
            <h2 className="font-medium text-lg dark:text-white">{value}</h2>
        </div>
    );
}