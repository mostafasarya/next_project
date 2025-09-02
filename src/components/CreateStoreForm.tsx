'use client';

import React, { useState } from 'react';
import './CreateStoreForm.css';
import StoreStepper from './StoreStepper';

interface StoreFormData {
  name: string;
  storeType: string;
  country: string;
  city: string;
  currency: string;
  category: string;
  description: string;
}

interface CreateStoreFormProps {
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
}

const CreateStoreForm: React.FC<CreateStoreFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    storeType: '',
    country: '',
    city: '',
    currency: '$ US Dollar ($)',
    category: '',
    description: ''
  });
  const [showStepper, setShowStepper] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStepper(true);
  };

  const handleStepperComplete = () => {
    onSubmit(formData);
  };

  const countries = [
    '🇺🇸 United States', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇩🇪 Germany', '🇫🇷 France',
    '🇦🇺 Australia', '🇯🇵 Japan', '🇮🇳 India', '🇧🇷 Brazil', '🇲🇽 Mexico',
    '🇪🇸 Spain', '🇮🇹 Italy', '🇳🇱 Netherlands', '🇸🇪 Sweden', '🇳🇴 Norway',
    '🇩🇰 Denmark', '🇫🇮 Finland', '🇨🇭 Switzerland', '🇦🇹 Austria', '🇧🇪 Belgium',
    '🇵🇱 Poland', '🇨🇿 Czech Republic', '🇭🇺 Hungary', '🇷🇴 Romania', '🇧🇬 Bulgaria',
    '🇷🇺 Russia', '🇺🇦 Ukraine', '🇹🇷 Turkey', '🇬🇷 Greece', '🇵🇹 Portugal',
    '🇮🇪 Ireland', '🇳🇿 New Zealand', '🇿🇦 South Africa', '🇪🇬 Egypt', '🇲🇦 Morocco',
    '🇹🇭 Thailand', '🇻🇳 Vietnam', '🇸🇬 Singapore', '🇲🇾 Malaysia', '🇵🇭 Philippines',
    '🇰🇷 South Korea', '🇨🇳 China', '🇹🇼 Taiwan', '🇭🇰 Hong Kong', '🇦🇪 UAE',
    '🇸🇦 Saudi Arabia', '🇶🇦 Qatar', '🇰🇼 Kuwait', '🇧🇭 Bahrain', '🇴🇲 Oman'
  ];

  const cities = {
    '🇺🇸 United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    '🇨🇦 Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
    '🇬🇧 United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'],
    '🇩🇪 Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    '🇫🇷 France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    '🇦🇺 Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Newcastle', 'Sunshine Coast', 'Wollongong'],
    '🇯🇵 Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Kobe', 'Kyoto', 'Fukuoka', 'Kawasaki', 'Saitama'],
    '🇮🇳 India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'],
    '🇧🇷 Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    '🇲🇽 Mexico': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Ciudad Juárez', 'León', 'Zapopan', 'Nezahualcóyotl', 'Guadalupe'],
    '🇪🇸 Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    '🇮🇹 Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
    '🇳🇱 Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    '🇸🇪 Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
    '🇳🇴 Norway': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes', 'Tromsø', 'Sarpsborg'],
    '🇩🇰 Denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde', 'Herning'],
    '🇫🇮 Finland': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori'],
    '🇨🇭 Switzerland': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'St. Gallen', 'Lucerne', 'Lugano', 'Biel'],
    '🇦🇹 Austria': ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten', 'Dornbirn'],
    '🇧🇪 Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst'],
    '🇵🇱 Poland': ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'],
    '🇨🇿 Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'Ústí nad Labem', 'České Budějovice', 'Hradec Králové', 'Pardubice'],
    '🇭🇺 Hungary': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Szombathely'],
    '🇷🇴 Romania': ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Galați', 'Ploiești', 'Brașov', 'Brăila'],
    '🇧🇬 Bulgaria': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Sliven', 'Dobrich', 'Shumen'],
    '🇷🇺 Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov'],
    '🇺🇦 Ukraine': ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol'],
    '🇹🇷 Turkey': ['Istanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır'],
    '🇬🇷 Greece': ['Athens', 'Thessaloniki', 'Patras', 'Piraeus', 'Larissa', 'Heraklion', 'Peristeri', 'Kallithea', 'Acharnes', 'Kalamaria'],
    '🇵🇹 Portugal': ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Funchal', 'Coimbra', 'Setúbal', 'Almada', 'Agualva-Cacém'],
    '🇮🇪 Ireland': ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Drogheda', 'Kilkenny', 'Sligo', 'Wexford', 'Tralee'],
    '🇳🇿 New Zealand': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua'],
    '🇿🇦 South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Kimberley', 'Nelspruit', 'Polokwane'],
    '🇪🇬 Egypt': ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Aswan'],
    '🇲🇦 Morocco': ['Casablanca', 'Rabat', 'Fez', 'Marrakech', 'Agadir', 'Tangier', 'Meknes', 'Oujda', 'Kénitra', 'Tetouan'],
    '🇹🇭 Thailand': ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Nakhon Ratchasima', 'Udon Thani', 'Khon Kaen', 'Nakhon Si Thammarat', 'Chiang Rai'],
    '🇻🇳 Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho', 'Bien Hoa', 'Hue', 'Nha Trang', 'Buon Ma Thuot', 'Vung Tau'],
    '🇸🇬 Singapore': ['Singapore'],
    '🇲🇾 Malaysia': ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Petaling Jaya', 'Johor Bahru', 'Malacca City', 'Alor Setar', 'Miri', 'Kuching'],
    '🇵🇭 Philippines': ['Manila', 'Quezon City', 'Davao City', 'Caloocan', 'Cebu City', 'Zamboanga City', 'Antipolo', 'Pasig', 'Taguig', 'Valenzuela'],
    '🇰🇷 South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam'],
    '🇨🇳 China': ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Tianjin', 'Chongqing', 'Nanjing', 'Wuhan', 'Xi\'an'],
    '🇹🇼 Taiwan': ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Banqiao', 'Hsinchu', 'Taoyuan', 'Keelung', 'Chiayi', 'Taitung'],
    '🇭🇰 Hong Kong': ['Hong Kong'],
    '🇦🇪 UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
    '🇸🇦 Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraydah', 'Khamis Mushait', 'Al Hofuf'],
    '🇶🇦 Qatar': ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail', 'Al Rayyan', 'Umm Salal', 'Al Daayen', 'Al Shamal'],
    '🇰🇼 Kuwait': ['Kuwait City', 'Salmiya', 'Hawalli', 'Al Ahmadi', 'Al Jahra', 'Al Farwaniyah', 'Mubarak Al-Kabeer', 'Al Wafra'],
    '🇧🇭 Bahrain': ['Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'A\'ali', 'Isa Town', 'Sitra', 'Al-Malikiyah'],
    '🇴🇲 Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Saham', 'Barka', 'Rustaq', 'Al Buraimi']
  };

  const currencies = [
    '$ US Dollar ($)',
    '€ Euro (€)',
    '£ British Pound (£)',
    '¥ Japanese Yen (¥)',
    '₹ Indian Rupee (₹)'
  ];

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books',
    'Health & Beauty', 'Toys & Games', 'Automotive', 'Food & Beverages', 'Jewelry'
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Your Store</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="store-form">
          <div className="form-group">
            <label htmlFor="name">
              <span className="icon">🏪</span>
              Store Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Store Name*"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeType">
              <span className="icon">🏪</span>
              Store Type*
            </label>
            <select
              id="storeType"
              name="storeType"
              value={formData.storeType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your store type</option>
              <option value="Online Only">Online Only - I only sell online</option>
              <option value="Physical Store">Physical Store - I have a physical location</option>
              <option value="Both">Both - I sell online and have a physical store</option>
            </select>
            <p className="helper-text">
              This helps us customize your store setup and features.
            </p>
          </div>

          <div className="form-group">
            <label>Store Location</label>
            <div className="location-inputs">
              <div className="location-field">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Country*</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="location-field">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.country}
                >
                  <option value="">City*</option>
                  {formData.country && cities[formData.country as keyof typeof cities]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currency">
              <span className="icon">💰</span>
              Store Currency*
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <p className="helper-text">
              Select the currency your store will use for all products and transactions, you can not change it later.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <span className="icon">🏷️</span>
              Business Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <p className="helper-text">
              Select the category that best describes your business.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <span className="icon">📝</span>
              Store Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your store..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-store-btn">
              <span className="icon">➕</span>
              Create Store
            </button>
          </div>
        </form>
      </div>
      
      {showStepper && (
        <StoreStepper
          onClose={() => setShowStepper(false)}
          onComplete={handleStepperComplete}
          storeName={formData.name}
        />
      )}
    </div>
  );
};

export default CreateStoreForm;
