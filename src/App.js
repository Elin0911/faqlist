import React, { useState, useRef, useEffect } from 'react';

// 將所有樣式從 Tailwind CSS 類別轉換為標準 CSS
const baseAppCss = `
.app-container {
    padding: 24px;
    background-color: #f3f4f6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-family: 'Inter', sans-serif;
}

@media (min-width: 1024px) {
    .app-container {
        flex-direction: row;
    }
}

.config-panel, .preview-panel {
    flex: 1;
    background-color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-height: calc(100vh - 48px);
    overflow-y: auto;
}

.panel-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #1f2937;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 12px;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
}

.add-category-btn {
    padding: 12px 24px;
    background-color: #2563eb;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}

.add-category-btn:hover {
    background-color: #1d4ed8;
    transform: scale(1.05);
}

.add-category-btn:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.clear-content-btn {
    padding: 12px 24px;
    background-color: #dc2626;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}

.clear-content-btn:hover {
    background-color: #b91c1c;
    transform: scale(1.05);
}

.clear-content-btn:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}

.empty-state {
    color: #6b7280;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
}

.category-card {
    background-color: #eff6ff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid #bfdbfe;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    border-bottom: 1px solid #bfdbfe;
    padding-bottom: 12px;
}

.category-input {
    font-size: 20px;
    font-weight: 600;
    color: #1e40af;
    background-color: #dbeafe;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #93c5fd;
    flex-grow: 1;
    margin-right: 16px;
}

.category-input:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.icon-button-group {
    display: flex;
    gap: 8px;
}

.icon-button {
    padding: 8px;
    background-color: #e5e7eb;
    border-radius: 9999px;
    color: #4b5563;
    transition-property: background-color;
    transition-duration: 200ms;
}

.icon-button:hover {
    background-color: #d1d5db;
}

.icon-button.delete {
    background-color: #fee2e2;
    color: #dc2626;
}

.icon-button.delete:hover {
    background-color: #fecaca;
}

.page-list-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1e40af;
}

.page-item-card {
    background-color: #ffffff;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.page-item-fields {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 8px;
    margin-right: 16px;
}

@media (min-width: 768px) {
    .page-item-fields {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

.page-input, .page-select {
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    color: #4b5563;
}

.page-input:focus, .page-select:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.add-page-btn {
    margin-top: 16px;
    width: 100%;
    padding: 12px 16px;
    background-color: #10b981;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition-property: background-color;
    transition-duration: 300ms;
}

.add-page-btn:hover {
    background-color: #059669;
}

.action-buttons-group {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #d1d5db;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.action-button {
    padding: 12px 24px;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}

.copy-btn {
    background-color: #9333ea;
}

.copy-btn:hover {
    background-color: #7e22ce;
    transform: scale(1.05);
}

.export-btn {
    background-color: #4f46e5;
}

.export-btn:hover {
    background-color: #4338ca;
    transform: scale(1.05);
}

.import-btn {
    background-color: #0d9488;
}

.import-btn:hover {
    background-color: #0f766e;
    transform: scale(1.05);
}

.hidden-input {
    display: none;
}

.preview-container {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9fafb;
    overflow: auto;
}
`;

const generatedHtmlCss = (data) => {
    let htmlContent = `
    <div class="faq-container">
        <style>
.faq-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Inter', sans-serif;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
}

.faq-title {
    text-align: center;
    color: #1f2937;
    margin-bottom: 30px;
    font-size: 2.25rem; /* text-4xl */
    font-weight: 700; /* font-bold */
}

.faq-category {
    margin-bottom: 15px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffffff;
}

.faq-category-header {
    background-color: #eff6ff;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem; /* text-xl */
    font-weight: 600; /* font-semibold */
    color: #1f2937;
    border-bottom: 1px solid #d1d5db;
}

.faq-category-header:hover {
    background-color: #e0f2fe;
}

.faq-category-content {
    display: none; /* Hidden by default */
    padding: 10px 20px;
    border-top: 1px solid #e5e7eb;
}

/* CSS for collapsible sections (no JS) */
.faq-checkbox {
    display: none;
}

.faq-checkbox:checked + .faq-category-header + .faq-category-content {
    display: block; /* Show content when checkbox is checked */
}

/* Arrow icon for collapse/expand */
.faq-category-header::after {
    content: '▼';
    font-size: 0.8em;
    margin-left: 10px;
    transition: transform 0.3s ease;
}

.faq-checkbox:checked + .faq-category-header::after {
    content: '▲';
}


.faq-page-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.faq-page-item {
    padding: 10px 0;
    border-bottom: 1px dashed #e5e7eb;
}

.faq-page-item:last-child {
    border-bottom: none;
}

.faq-page-link {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.faq-page-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

.faq-page-audience {
    font-size: 0.875rem; /* text-sm */
    color: #6b7280;
    margin-left: 10px;
    padding: 2px 6px;
    background-color: #e0e7eb;
    border-radius: 4px;
}

.faq-page-audience.admin {
    background-color: #fef3c7; /* yellow-100 */
    color: #92400e; /* yellow-800 */
}
        </style>
        <h1 class="faq-title">FAQ 目錄</h1>
    `;

    data.forEach((category) => {
        htmlContent += `
        <div class="faq-category">
            <input type="checkbox" id="faq-cat-${category.id}" class="faq-checkbox">
            <label for="faq-cat-${category.id}" class="faq-category-header">
                ${category.name}
            </label>
            <div class="faq-category-content">
                <ul class="faq-page-list">
        `;
        category.pages.forEach(page => {
            htmlContent += `
                    <li class="faq-page-item">
                        <a href="${page.url}" target="_blank" rel="noopener noreferrer" class="faq-page-link">
                            ${page.name}
                        </a>
                        <span class="faq-page-audience ${page.audience === 'admin' ? 'admin' : ''}">
                            ${page.audience === 'all' ? '全部' : '管理者'}
                        </span>
                    </li>
            `;
        });
        htmlContent += `
                </ul>
            </div>
        </div>
        `;
    });

    htmlContent += `</div>`;
    return htmlContent;
};

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

function App() {
    const [categories, setCategories] = useState([]);
    const [htmlOutput, setHtmlOutput] = useState('');
    const htmlOutputRef = useRef(null);

    useEffect(() => {
        try {
            const savedCategories = localStorage.getItem('faqCategories');
            if (savedCategories) {
                setCategories(JSON.parse(savedCategories));
            }
        } catch (error) {
            console.error("Error loading categories from localStorage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('faqCategories', JSON.stringify(categories));
            setHtmlOutput(generatedHtmlCss(categories));
        } catch (error) {
            console.error("Error saving categories to localStorage:", error);
        }
    }, [categories]);

    const addCategory = () => {
        setCategories([...categories, { id: generateId(), name: '新分類', pages: [] }]);
    };

    const removeCategory = (categoryId) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
    };

    const updateCategoryName = (categoryId, newName) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId ? { ...cat, name: newName } : cat
        ));
    };

    const moveCategory = (categoryId, direction) => {
        const index = categories.findIndex(cat => cat.id === categoryId);
        if (index === -1) return;

        const newCategories = [...categories];
        if (direction === 'up' && index > 0) {
            [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
        } else if (direction === 'down' && index < newCategories.length - 1) {
            [newCategories[index + 1], newCategories[index]] = [newCategories[index], newCategories[index + 1]];
        }
        setCategories(newCategories);
    };

    const addPage = (categoryId) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId
                ? { ...cat, pages: [...cat.pages, { id: generateId(), name: '新頁面', url: '#', audience: 'all' }] }
                : cat
        ));
    };

    const removePage = (categoryId, pageId) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId
                ? { ...cat, pages: cat.pages.filter(page => page.id !== pageId) }
                : cat
        ));
    };

    const updatePage = (categoryId, pageId, field, value) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId
                ? {
                    ...cat,
                    pages: cat.pages.map(page =>
                        page.id === pageId ? { ...page, [field]: value } : page
                    )
                }
                : cat
        ));
    };

    const movePage = (categoryId, pageId, direction) => {
        setCategories(categories.map(cat => {
            if (cat.id === categoryId) {
                const index = cat.pages.findIndex(page => page.id === pageId);
                if (index === -1) return cat;

                const newPages = [...cat.pages];
                if (direction === 'up' && index > 0) {
                    [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
                } else if (direction === 'down' && index < newPages.length - 1) {
                    [newPages[index + 1], newPages[index]] = [newPages[index], newPages[index + 1]];
                }
                return { ...cat, pages: newPages };
            }
            return cat;
        }));
    };

    const clearAllContent = () => {
        if (window.confirm('您確定要清空所有 FAQ 內容嗎？此操作無法復原。')) {
            setCategories([]);
            alert('所有內容已清空！');
        }
    };

    const copyHtmlToClipboard = () => {
        if (htmlOutputRef.current) {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = htmlOutputRef.current.innerHTML;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            try {
                document.execCommand('copy');
                alert('HTML + CSS 碼已複製到剪貼簿！');
            } catch (err) {
                console.error('無法複製到剪貼簿:', err);
                alert('複製失敗，請手動複製。');
            } finally {
                document.body.removeChild(tempTextArea);
            }
        }
    };

    const exportSettings = () => {
        const json = JSON.stringify(categories, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
        const filename = `${formattedDateTime}_faq_settings.json`;
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const importSettings = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (Array.isArray(importedData) && importedData.every(cat => cat.id && cat.name && Array.isArray(cat.pages))) {
                        setCategories(importedData);
                        alert('設定檔案匯入成功！');
                    } else {
                        throw new Error('檔案格式不正確。');
                    }
                } catch (error) {
                    console.error('匯入設定失敗:', error);
                    alert(`匯入設定失敗: ${error.message || '檔案格式不正確或損壞。'}`);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="app-container">
            <style>{baseAppCss}</style>
            {/* 設定區塊 */}
            <div className="config-panel">
                <h2 className="panel-title">FAQ 目錄設定</h2>
                <div className="button-group">
                    <button
                        onClick={addCategory}
                        className="add-category-btn"
                    >
                        + 增加大分類
                    </button>
                    <button
                        onClick={clearAllContent}
                        className="clear-content-btn"
                    >
                        清空所有內容
                    </button>
                </div>
                {categories.length === 0 && (
                    <p className="empty-state">尚無大分類，請點擊「增加大分類」按鈕新增。</p>
                )}
                {categories.map((category, catIndex) => (
                    <div key={category.id} className="category-card">
                        <div className="category-header">
                            <input
                                type="text"
                                value={category.name}
                                onChange={(e) => updateCategoryName(category.id, e.target.value)}
                                className="category-input"
                                placeholder="分類名稱"
                            />
                            <div className="icon-button-group">
                                <button
                                    onClick={() => moveCategory(category.id, 'up')}
                                    disabled={catIndex === 0}
                                    className="icon-button"
                                    title="上移分類"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => moveCategory(category.id, 'down')}
                                    disabled={catIndex === categories.length - 1}
                                    className="icon-button"
                                    title="下移分類"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => removeCategory(category.id)}
                                    className="icon-button delete"
                                    title="刪除分類"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <h3 className="page-list-title">頁面列表:</h3>
                        {category.pages.length === 0 && (
                            <p className="empty-state">此分類下尚無頁面。</p>
                        )}
                        {category.pages.map((page, pageIndex) => (
                            <div key={page.id} className="page-item-card">
                                <div className="page-item-fields">
                                    <input
                                        type="text"
                                        value={page.name}
                                        onChange={(e) => updatePage(category.id, page.id, 'name', e.target.value)}
                                        className="page-input"
                                        placeholder="頁面名稱"
                                    />
                                    <input
                                        type="text"
                                        value={page.url}
                                        onChange={(e) => updatePage(category.id, page.id, 'url', e.target.value)}
                                        className="page-input"
                                        placeholder="連結 URL"
                                    />
                                    <select
                                        value={page.audience}
                                        onChange={(e) => updatePage(category.id, page.id, 'audience', e.target.value)}
                                        className="page-select"
                                    >
                                        <option value="all">全部</option>
                                        <option value="admin">管理者</option>
                                    </select>
                                </div>
                                <div className="icon-button-group">
                                    <button
                                        onClick={() => movePage(category.id, page.id, 'up')}
                                        disabled={pageIndex === 0}
                                        className="icon-button"
                                        title="上移頁面"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => movePage(category.id, page.id, 'down')}
                                        disabled={pageIndex === category.pages.length - 1}
                                        className="icon-button"
                                        title="下移頁面"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => removePage(category.id, page.id)}
                                        className="icon-button delete"
                                        title="刪除頁面"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addPage(category.id)}
                            className="add-page-btn"
                        >
                            + 增加頁面
                        </button>
                    </div>
                ))}
                <div className="action-buttons-group">
                    <button
                        onClick={copyHtmlToClipboard}
                        className="action-button copy-btn"
                    >
                        一鍵複製
                    </button>
                    <button
                        onClick={exportSettings}
                        className="action-button export-btn"
                    >
                        匯出設定檔
                    </button>
                    <label className="action-button import-btn">
                        匯入設定檔
                        <input
                            type="file"
                            accept=".json"
                            onChange={importSettings}
                            className="hidden-input"
                        />
                    </label>
                </div>
            </div>

            {/* 預覽區塊 */}
            <div className="preview-panel">
                <h2 className="panel-title">HTML 樣板預覽</h2>
                <div
                    ref={htmlOutputRef}
                    dangerouslySetInnerHTML={{ __html: htmlOutput }}
                    className="preview-container"
                ></div>
            </div>
        </div>
    );
}

export default App;
