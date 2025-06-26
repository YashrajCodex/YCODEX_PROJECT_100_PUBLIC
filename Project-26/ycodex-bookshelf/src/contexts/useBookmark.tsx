import React, { createContext, useState} from "react";

interface bookmark {
    setBookmark: (id:string, bookmark:boolean) => void;
    bookmark: {
        id: string;
        bookMark: boolean
    }[];
}
const bookmarkContext = createContext<bookmark | undefined>(undefined);
export default function BookmarkProvider(children: React.ReactNode) {
    const [bookmarked, setBookMarked] = useState<bookmark | undefined>();
    

  return (
    <bookmarkContext.Provider value={bookmarked}>
      {children}
    </bookmarkContext.Provider>
  );
}
