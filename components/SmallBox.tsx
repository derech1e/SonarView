export function SmallBox({heading, subheading, value}: { heading: string, subheading: string, value: string | number | boolean }) {
    return (
        <div className="flex flex-col rounded-lg p-6 gap-2 border md:w-1/4 border-gray-200">
            <div className="flex flex-col gap-1">
                <h2 className="font-medium text-lg dark:text-white">{heading}</h2>
                <p className="text-sm text-gray-600 dark:text-dark-text">{subheading}</p>
            </div>
            <h2 className="font-medium text-lg dark:text-white">{value}</h2>
        </div>
    );
}