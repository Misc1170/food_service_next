import { Slider, Tooltip } from "@nextui-org/react";
import { useState } from "react";

export default function SetsFiltersSlider({ onChangeProp }) {
    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    const handleChange = (item) => {
        console.log(item, value)
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());
        // onChangeProp(item)
    };



    return (
        <Slider
            id="budget"
            label="Бюджет в день на еду"
            size="sm"
            step={1}
            maxValue={10000}
            minValue={0}
            color="foreground"
            name="budget"
            classNames={{
                base: "max-w-md",
                label: "text-medium",
            }}
            value={value}
            onChange={(item) => handleChange(item)}
            // we extract the default children to render the input
            renderValue={({ children, ...props }) => (
                <output {...props}>
                    <Tooltip
                        className="text-tiny text-default-500 rounded-md"
                        content="Нажмите Enter для подтверждения"
                        placement="left"
                    >
                        <input
                            className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-4A914C focus:border-4A914C"
                            name="budget"
                            type="text"
                            aria-label="budget value"
                            value={inputValue}
                            max={10000}
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
                </output>
            )}
        />
    )
}