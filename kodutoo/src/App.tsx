import React, { useState, useEffect } from 'react';
import type {Car} from './types';
import CarCard from './components/CarCard';
import CarForm from './components/CarForm';
import { CarFront, Filter, SortAsc, Ghost } from 'lucide-react';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'year' | 'model'>('year');

  // Funktsioon uue auto lisamiseks
  const addCar = (newCar: Omit<Car, 'id' | 'isFavorite'>) => {
    const car: Car = {
      ...newCar,
      id: crypto.randomUUID(),
      isFavorite: false,
    };
    setCars([...cars, car]);
  };

  // Funktsioonide haldus
  const deleteCar = (id: string) => setCars(cars.filter(c => c.id !== id));
  const toggleFavorite = (id: string) => {
    setCars(cars.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  // Filtreerimine ja sorteerimine
  const displayedCars = cars
    .filter(car => filter === 'all' || car.isFavorite)
    .sort((a, b) => sortBy === 'year' ? b.year - a.year : a.model.localeCompare(b.model));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-800">
            <CarFront className="text-amber-600" size={40} />
            Vintage Garage
          </h1>
          <p className="text-slate-500 mt-2">Sinu eksklusiivne uunikumide kollektsioon</p>
        </div>

        <div className="flex gap-4 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <button
            onClick={() => setFilter(filter === 'all' ? 'favorites' : 'all')}
            className={`px-4 py-2 rounded-lg transition-all ${filter === 'favorites' ? 'bg-amber-600 text-white' : 'hover:bg-slate-100'}`}
          >
            <Filter size={18} className="inline mr-2" />
            {filter === 'all' ? 'Kõik' : 'Lemmikud'}
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'year' ? 'model' : 'year')}
            className="px-4 py-2 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-2"
          >
            <SortAsc size={18} />
            {sortBy === 'year' ? 'Aasta' : 'Mudel'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Külgriba: Lisamise vorm */}
        <div className="lg:col-span-1">
          <CarForm onAdd={addCar} />
        </div>

        {/* Peamine ala: Autode nimekiri */}
        <div className="lg:col-span-3">
          {displayedCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <Ghost size={64} className="mb-4 opacity-20" />
              <p className="text-xl">Kollektsioon on tühi...</p>
              <p className="text-sm">Lisa oma esimene uunikum vasakult menüüst!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {displayedCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  onDelete={deleteCar}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;