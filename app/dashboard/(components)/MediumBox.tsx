export function MediumBox({heading, subheading, value}: { heading: string, subheading: string, value: string | number }) {
    return (
        <div className="flex flex-col rounded-lg p-6 gap-2 border w-1/2 border-gray-200">
            <div className="flex flex-col gap-1">
                <h2 className="font-medium text-lg">{heading}</h2>
                <p className="text-sm text-gray-600">{subheading}</p>
            </div>
            <h2 className="font-medium text-lg">{value}</h2>
        </div>
    );
}