import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchParams } from '../../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    area: '',
    age: '',
    gender: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="名前、特徴、目撃場所などで検索"
            className="w-full border rounded-lg py-3 px-4 pl-11 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchParams.keyword}
            onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <select
              className="w-full border rounded-lg py-2 px-3 bg-white"
              value={searchParams.area}
              onChange={(e) => setSearchParams({ ...searchParams, area: e.target.value })}
            >
              <option value="">全国</option>
              <option value="hokkaido">北海道</option>
              <option value="tokyo">東京都</option>
              <option value="osaka">大阪府</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
            <select
              className="w-full border rounded-lg py-2 px-3 bg-white"
              value={searchParams.age}
              onChange={(e) => setSearchParams({ ...searchParams, age: e.target.value })}
            >
              <option value="">指定なし</option>
              <option value="0-12">0-12歳</option>
              <option value="13-19">13-19歳</option>
              <option value="20-40">20-40歳</option>
              <option value="41-64">41-64歳</option>
              <option value="65-">65歳以上</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
            <select
              className="w-full border rounded-lg py-2 px-3 bg-white"
              value={searchParams.gender}
              onChange={(e) => setSearchParams({ ...searchParams, gender: e.target.value })}
            >
              <option value="">指定なし</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            検索する
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;