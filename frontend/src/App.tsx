import type { FC } from 'react';
import { useState, useEffect } from 'react';
import SearchForm from './components/search/SearchForm';
import PostForm from './components/post/PostForm';
import type { SearchParams, MissingPerson } from './types';
import { missingPersonsApi } from './services/api';

const App: FC = () => {
  const [activeView, setActiveView] = useState<'search' | 'post'>('search');
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMissingPersons = async (params?: SearchParams) => {
    setIsLoading(true);
    try {
      const data = await missingPersonsApi.getAll(params);
      setMissingPersons(data);
    } catch (error) {
      console.error('Failed to fetch missing persons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingPersons();
  }, []);

  const handleSearch = (params: SearchParams) => {
    fetchMissingPersons(params);
  };

  const handlePostSubmit = async (formData: FormData) => {
    try {
      await missingPersonsApi.create(formData);
      setActiveView('search');
      fetchMissingPersons(); // 投稿後にリストを更新
    } catch (error) {
      console.error('Failed to submit:', error);
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
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-2xl font-bold">行方不明者情報を探す</h2>
              </div>
              <SearchForm onSearch={handleSearch} />
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {missingPersons.map((person) => (
                    <div key={person.id} className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium">{person.title}</h3>
                      <p className="mt-2 text-gray-600">{person.description}</p>
                      <div className="mt-4 text-sm">
                        <p><span className="font-medium">名前：</span>{person.name}</p>
                        <p><span className="font-medium">年齢：</span>{person.age}歳</p>
                        <p><span className="font-medium">最終目撃：</span>{new Date(person.lastSeenDate).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-2xl font-bold">行方不明者情報の提供</h2>
              </div>
              <PostForm 
                onSubmit={handlePostSubmit}
                onCancel={() => setActiveView('search')}
              />
            </>
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