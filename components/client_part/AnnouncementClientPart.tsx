"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';

// Lib
import { getAllAnnouncements } from '@/lib/data/announcements';

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/announcement.module.css";

interface Announcement {
  id: number;
  title: string;
  date: string;
  category: string;
}

export default function AnnouncementClientPart() {
  const categories = ['綜合', '公告', '更新', '系統'];
  // State
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('綜合');
  const itemsPerPage = 10;
  // Effect
  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllAnnouncements();
      setAnnouncements(allData);
    };
    fetchData();
  }, []);
  // Handle
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  // Filter
  const filteredAnnouncements = announcements.filter(
    (ann) => selectedCategory === '綜合' || ann.category === selectedCategory
  );
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);

  return (
    <>
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <div className={`${content["content"]} ${main["content"]}`}>
            <h2>官方公告</h2>
            <div className={main["categoryFilters"]}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`${main["categoryButton"]} ${selectedCategory === category ? main["active"] : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {announcements.length > 0 ? (
              <>
                <div className={main["announcementWrapper"]}>
                  <ul className={main["announcementList"]}>
                    {currentAnnouncements.length > 0 ? (
                      currentAnnouncements.map((announcement) => (
                        <li key={`${announcement.id}-${announcement.date}`} className={main["announcementItem"]}>
                          <Link href={`/announcement/${announcement.id}`} className={main["itemLink"]}>
                            <div className={main["itemTitleBlock"]}>
                              <span className={`${main["itemCategory"]} ${main[`category${announcement.category}`] || ''}`}>
                                {announcement.category}
                              </span>
                              <span className={main["itemTitle"]}>{announcement.title}</span>
                            </div>
                          </Link>
                          <span className={main["itemDate"]}>{announcement.date}</span>
                        </li>
                      ))
                    ) : (
                      <li className={main["noResults"]}>此分類目前沒有公告。</li>
                    )}
                  </ul>
                </div>

                {totalPages > 1 && filteredAnnouncements.length > 0 && (
                  <div className={main["paginationControls"]}>
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={main["pageButton"]}
                    >
                      上一頁
                    </button>
                    <span>
                      第 {currentPage} / {totalPages} 頁
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={main["pageButton"]}
                    >
                      下一頁
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>讀取中或目前沒有公告...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
