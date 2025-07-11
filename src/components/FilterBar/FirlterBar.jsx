import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setLevels, setLanguages, setPrice } from '../../redux/filters/slice';
import { useEffect } from 'react';
import { selectTeachers } from '../../redux/teachers/selectors';




const levelOptions = [
  { value: 'A1 Beginner', label: 'A1' },
  { value: 'A2 Elementary', label: 'A2' },
  { value: 'B1 Intermediate', label: 'B1' },
  { value: 'B2 Upper-Intermediate', label: 'B2' },
  { value: 'C1 Advanced', label: 'C1' },
  { value: 'C2 Proficient', label: 'C2' },
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
  {value: 'Korean', label: 'Korean'},
  {value: "Italian", label: "Italian"},
  {value: "Vietnamese", label: "Vietnamese"},

];

const priceOptions = [
  { value: '30', label: '30$' },
  { value: '40', label: '40$' },
  { value: '50', label: '50$' },
  { value: '60', label: '60$' },
  { value: '70', label: '70$' },
  { value: '80', label: '80$' },
];

export const FilterBar = () => {


const allState = useSelector(s => s);
console.log("ALL STATE", allState);

const languages = allState.filters.languages;
const levels = allState.filters.levels;
const price = allState.filters.price;


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
  useEffect(() => {
  console.log("USE EFFECT LANGUAGES:", languages);
}, [languages]);

  const selectedLevelOption = levels ? levelOptions.find(opt => opt.value === levels) : null;
  const selectedLanguageOption = languages ? languageOptions.find(opt => opt.value === languages) : null;
  const selectedPriceOption = price ? priceOptions.find(opt => opt.value === price) : null;

  return (
    <div>
      <h3>Filters</h3>
      <Select
        options={levelOptions}
        onChange={handleLevelChange}
        value={selectedLevelOption}
      />
      <Select
        options={languageOptions}
        onChange={handleLanguageChange}
        value={selectedLanguageOption}
      />
      <Select
        options={priceOptions}
        onChange={handlePriceChange}
        value={selectedPriceOption}
      />
    </div>
  );
};