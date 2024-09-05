import { Slider, Tooltip } from "@nextui-org/react";
import { useRef, useState } from "react";

export default function SetsFiltersSlider({ onChangeProp, defaultValue}) {
    const inputRef = useRef()
    const [value, setValue] = useState(defaultValue ?? 0);
    const [inputValue, setInputValue] = useState(defaultValue ?? 0);

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;
        
        const item = inputRef;
        
        setValue(value);
        setInputValue(value.toString());
        onChangeProp(item)
    };

    return (
        <Slider
            id="kcal"
            label="Количество Ккал в день"
            size="sm"
            step={1}
            maxValue={4000}
            minValue={0}
            color="secondary"
            name="kcal"
            classNames={{
                base: "max-w-md",
                label: "text-medium",
            }}
            value={value}
            onChange={handleChange}
            renderValue={({ children, ...props }) => (
                <output {...props}>
                    <Tooltip
                        className="text-tiny text-default-500 rounded-md"
                        content="Нажмите Enter для подтверждения"
                        placement="left"
                    >
                        <input
                            ref={inputRef}
                            className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-4A914C focus:border-4A914C"
                            name="kcal"
                            type="text"
                            aria-label="kcal value"
                            max={4000}
                            value={inputValue}
                            onChange={(item) => {
                                setInputValue(item.target.value)
                                onChangeProp(item)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                                    setValue(Number(inputValue));
                                }
                            }}
                        />
                    </Tooltip>
                    <span>Ккал</span>
                </output>
            )}
        />
    )
}