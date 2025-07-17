import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setLevels, setLanguages, setPrice } from "../../redux/filters/slice";
import {
  selectLanguages,
  selectLevels,
  selectPrice,
} from "../../redux/filters/selectors";
import { customStyles, theme } from "../../constants/customStyles";
import s from "./FilterBar.module.css";

const levelOptions = [
  { value: "", label: "Select level" },
  { value: "A1 Beginner", label: "A1" },
  { value: "A2 Elementary", label: "A2" },
  { value: "B1 Intermediate", label: "B1" },
  { value: "B2 Upper-Intermediate", label: "B2" },
  { value: "C1 Advanced", label: "C1" },
  { value: "C2 Proficient", label: "C2" },
];

const languageOptions = [
  { value: "", label: "Select language" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Mandarin Chinese", label: "Mandarin Chinese" },
  { value: "Korean", label: "Korean" },
  { value: "Italian", label: "Italian" },
  { value: "Vietnamese", label: "Vietnamese" },
];

const priceOptions = [
  { value: "", label: "Select price" },
  { value: "30", label: "30$" },
  { value: "40", label: "40$" },
  { value: "50", label: "50$" },
  { value: "60", label: "60$" },
  { value: "70", label: "70$" },
  { value: "80", label: "80$" },
];

export const FilterBar = () => {
  const languages = useSelector(selectLanguages);
  const levels = useSelector(selectLevels);
  const price = useSelector(selectPrice);

  const dispatch = useDispatch();

  const handleLevelChange = (selected) => {
    dispatch(setLevels(selected ? selected.value : null));
  };
  const handleLanguageChange = (selected) => {
    dispatch(setLanguages(selected ? selected.value : null));
  };
  const handlePriceChange = (selected) => {
    dispatch(setPrice(selected ? selected.value : null));
  };

  const selectedLevelOption = levels
    ? levelOptions.find((opt) => opt.value === levels)
    : null;
  const selectedLanguageOption = languages
    ? languageOptions.find((opt) => opt.value === languages)
    : null;
  const selectedPriceOption = price
    ? priceOptions.find((opt) => opt.value === price)
    : null;

  return (
    <div className={s.container}>
      <label>
        <span className={s.label}>Languages</span>
        <Select
          className="react-select-language"
          theme={theme}
          styles={customStyles}
          options={languageOptions}
          onChange={handleLanguageChange}
          value={selectedLanguageOption}
          placeholder="Select language"
        />
      </label>
      <label>
        <span className={s.label}>Level of knowledge</span>
        <Select
          className="react-select-level"
          theme={theme}
          styles={customStyles}
          options={levelOptions}
          onChange={handleLevelChange}
          value={selectedLevelOption}
          placeholder="Select level"
        />
      </label>

      <label>
        <span className={s.label}>Price</span>
        <Select
          theme={theme}
          styles={customStyles}
          options={priceOptions}
          onChange={handlePriceChange}
          value={selectedPriceOption}
          placeholder="Select price"
        />
      </label>
    </div>
  );
};
