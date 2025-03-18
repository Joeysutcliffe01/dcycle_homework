import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  GenderData,
  NationalityData,
  AgeData,
  SavedCard,
} from "../../types/nameForm";
import { API_BASE_URL } from "../../config";

// Images
import boyYoung from "../../assets/NameFormUserPhotos/boy_young.png";
import boyMiddle from "../../assets/NameFormUserPhotos/boy_medium.png";
import boyOld from "../../assets/NameFormUserPhotos/boy_old.png";
import girlYoung from "../../assets/NameFormUserPhotos/girl_young.png";
import girlMiddle from "../../assets/NameFormUserPhotos/girl_medium.png";
import girlOld from "../../assets/NameFormUserPhotos/girl_old.png";

// Lottie JSON
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/lottie_search_loading.json";

const NameForm: React.FC = () => {
  // State for user input and API results
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<GenderData | null>(null);
  const [nationality, setNationality] = useState<NationalityData | null>(null);
  const [age, setAge] = useState<AgeData | null>(null);

  // UI state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved cards on mount
  useEffect(() => {
    const storedCards = localStorage.getItem("savedCards");
    if (storedCards) {
      const parsed: SavedCard[] = JSON.parse(storedCards);
      setSavedCards(parsed);
    }
  }, []);

  // Capitalize first letter of each word in the name
  const capitalizeName = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getProfileImage = (ageValue: number, genderValue: string) => {
    const genderLower = genderValue?.toLowerCase();
    if (genderLower === "female") {
      if (ageValue < 18) return girlYoung;
      if (ageValue < 50) return girlMiddle;
      return girlOld;
    } else {
      if (ageValue < 18) return boyYoung;
      if (ageValue < 50) return boyMiddle;
      return boyOld;
    }
  };

  // Fetch gender, nationality, and age data for the given name
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const genderRes = await axios.get<GenderData>(
        `${API_BASE_URL}/api/genderize/${name}`
      );
      const nationalityRes = await axios.get<NationalityData>(
        `${API_BASE_URL}/api/nationalize/${name}`
      );
      const ageRes = await axios.get<AgeData>(
        `${API_BASE_URL}/api/agify/${name}`
      );

      setGender(genderRes.data);
      setNationality(nationalityRes.data);
      setAge(ageRes.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save current prediction to localStorage
  const saveCard = () => {
    if (!gender || !nationality || !age) return;
    const newCard: SavedCard = { name, gender, nationality, age };
    const updatedCards = [...savedCards, newCard];
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    setSavedCards(updatedCards);
    setIsModalOpen(false);
    setName("");
  };

  const deleteCard = (index: number) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    setSavedCards(updatedCards);
  };

  return (
    <div>
      <div className="h-90 bg-gray-50 px-4 py-8 flex justify-center items-center">
        {/* 🔍 Search Section */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Predictions Based On Name
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-2 shadow-lg rounded-lg bg-white p-2"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Last or full name"
              className="px-4 py-2 outline-none w-72 text-gray-700"
            />
            <button
              type="submit"
              className="p-3 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-600 cursor-pointer flex items-center justify-center"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? (
                <Lottie
                  animationData={loadingAnimation}
                  className="w-4 h-4 filter invert sepia hue-rotate-45"
                />
              ) : (
                <FaSearch />
              )}
            </button>
          </form>
        </div>

        {/* Modal Popup */}
        {isModalOpen && gender && nationality && age && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
            <div className="bg-white rounded-xl flex p-4 w-[900px] relative justify-evenly items-center">
              <img
                src={getProfileImage(age.age, gender.gender)}
                alt="Profile"
                className="w-40 h-full object-cover rounded-l-xl"
              />
              <div className="p-6 flex-col">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {capitalizeName(name)}
                </h2>
                <p className="text-gray-600">
                  Gender: {gender.gender} (
                  {(gender.probability * 100).toFixed(1)}%)
                </p>
                <p className="text-gray-600">Age: {age.age} years</p>
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-700">Nationality:</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {nationality.country.map((country) => (
                      <li
                        key={country.country_id}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={`https://flagcdn.com/w40/${country.country_id.toLowerCase()}.png`}
                          alt={country.country_id}
                          className="w-6 h-4 object-cover rounded"
                        />
                        <span>{country.country_id}</span>
                        <span>{(country.probability * 100).toFixed(1)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={saveCard}
                  className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-600 cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved Cards Section */}
      <div className="w-full h-full mt-10 flex flex-wrap gap-6 justify-center">
        {savedCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg flex p-4 justify-center items-center gap-30 w-117"
          >
            <img
              src={getProfileImage(card.age.age, card.gender.gender)}
              alt="Profile"
              className="w-25 h-full object-contain m-5"
            />
            <div className="p-4 flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {capitalizeName(card.name)}
              </h2>
              <p className="text-gray-600">
                Gender: {card.gender.gender} (
                {(card.gender.probability * 100).toFixed(1)}%)
              </p>
              <p className="text-gray-600">Age: {card.age.age} years</p>
              <div className="mt-2">
                <h3 className="font-semibold text-gray-700">Nationality:</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {card.nationality.country.map((country) => (
                    <li
                      key={country.country_id}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.country_id.toLowerCase()}.png`}
                        alt={country.country_id}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span>{country.country_id}</span>
                      <span>{(country.probability * 100).toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => deleteCard(index)}
                className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-red-700 to-red-400 text-white hover:from-red-400 hover:to-red-700 cursor-pointer"
              >
                Delete Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NameForm;
