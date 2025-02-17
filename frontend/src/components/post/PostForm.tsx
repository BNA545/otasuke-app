import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface PostFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onCancel }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });
    await onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">行方不明者情報の提供</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細な状況
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="description"
            required
            className="w-full border rounded-lg py-2 px-3 h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年齢
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="age"
              required
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            性別
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            name="gender"
            required
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            最後に目撃された場所
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="lastSeenLocation"
            required
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            最後に目撃された日時
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="datetime-local"
            name="lastSeenDate"
            required
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            写真
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setSelectedFiles(files);
              }}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                クリックして写真をアップロード
              </span>
            </label>
            {selectedFiles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="text-sm text-gray-500">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;