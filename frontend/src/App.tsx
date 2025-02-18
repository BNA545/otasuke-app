import type { FC } from 'react';
import { useState } from 'react';
import SearchForm from './components/search/SearchForm';
import PostForm from './components/post/PostForm';
import type { SearchParams } from './types';

const App: FC = () => {
  const [activeView, setActiveView] = useState<'search' | 'post'>('search');

  const handleSearch = (params: SearchParams) => {
    console.log('Search params:', params);
  };

  const handlePostSubmit = async (formData: FormData) => {
    try {
      console.log('Form data:', formData);
      setActiveView('search');
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