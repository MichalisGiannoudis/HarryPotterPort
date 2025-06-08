import { House } from '@/models/house.interface';

const HouseCard = ({ house }: { house: House }) => {

  const getHouseGradient = (houseColors?: string) => {
    
    // If no house colors are provided, return a default gradient (white to black)
    if (!houseColors){
       return 'linear-gradient(to right, white, black)';
    }   
   
    // Split the house colors by "and" and trim whitespace, then validate each color
    const colors = houseColors
      .split(/\s+and\s+/i)
      .map(c => c.trim().toLowerCase());
    const allColorsValid = colors.every(isValidCSSColor);
    
    return allColorsValid
    ? `linear-gradient(to right, ${colors.join(', ')})`
    : 'linear-gradient(to right, white, black)';
  };

  // Function to check if a string is a valid CSS color
  const isValidCSSColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return !!s.color;
  };

  return (
    <div className="max-w-sm rounded-lg border border-gray-300 shadow-xl bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold font-f">{house.name}</h2>
        <span className="text-md font-semibold">{house.animal}</span>
      </div>
      <div>
        <div className="h-5 rounded-md" style={{ background: getHouseGradient(house.houseColours) }}></div>
      </div>
      <p className="mb-2">
        <span className="font-semibold">Founder: </span>
        <span className="font-bold">{house.founder}</span>
      </p>
      <input
        type="text"
        placeholder="Search house traits"
        className="w-[65%] mb-3 px-3 py-1 border rounded-xl focus:outline-none focus:ring-gray-300 focus:border-gray-300 border-gray-200"
      />
      <div className="flex flex-wrap gap-2">
        {house.traits.map((trait) => (
          <span key={trait.id} className="bg-gray-800 text-white flex items-center justify-center px-3 rounded-lg text-sm">
            {trait.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HouseCard;