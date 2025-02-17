import React, { useState, useEffect } from 'react';
import SearchForm from './components/search/SearchForm';
import PostForm from './components/post/PostForm';
import MissingPersonCard from './components/card/MissingPersonCard';
import { SearchParams, MissingPerson } from './types';
import { missingPersonsApi } from './services/api';

const App = () => {
  const [activeView, setActiveView] = useState<'search' | 'post'>('search');
  const [isLoading, setIsLoading] = useState(false);
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [showRewardOnly, setShowRewardOnly] = useState(false);

  const fetchMissingPersons = async (params?: SearchParams) => {
    setIsLoading(true);
    try {
      const data = await missingPersonsApi.getAll({
        ...params,
        hasReward: showRewardOnly || undefined,
      });
      setMissingPersons(data);
    } catch (error) {
      console.error('Failed to fetch missing persons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingPersons();
  }, [showRewardOnly]);

  const handleSearch = (params: SearchParams) => {
    fetchMissingPersons(params);
  };

  const handlePostSubmit = async (formData: FormData) => {
    try {
      await missingPersonsApi.create(formData);
      setActiveView('search');
      fetchMissingPersons();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">おたすけ</h1>
          </div>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12 space-x-8">
            <button 
              className={`hover:text-teal-300 ${activeView === 'search' ? 'text-teal-300' : ''}`}
              onClick={() => setActiveView('search')}
            >
              情報を探す
            </button>
            <button 
              className={`hover:text-teal-300 ${activeView === 'post' ? 'text-teal-300' : ''}`}
              onClick={() => setActiveView('post')}
            >
              情報を提供する
            </button>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {activeView === 'search' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">行方不明者情報を探す</h2>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showRewardOnly}
                      onChange={(e) => setShowRewardOnly(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">報奨金あり</span>
                  </label>
                </div>
              </div>

              <SearchForm onSearch={handleSearch} />

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {missingPersons.map((person) => (
                    <MissingPersonCard key={person.id} data={person} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <PostForm
              onSubmit={handlePostSubmit}
              onCancel={() => setActiveView('search')}
            />
          )}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 おたすけ All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;