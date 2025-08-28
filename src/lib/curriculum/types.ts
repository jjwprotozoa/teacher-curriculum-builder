export type Stretch = {
  numeracy: string;
  literacy: string;
  creative: string;
  motor: {
    fine: string;
    gross: string;
    practicalLife: string;
  };
  socialEmotional: string;
  scienceInquiry: string;
  resources: {
    books: string[];
    songs: string[];
    materials: string[];
  };
};

export type Week = {
  weekNumber: number;
  theme: string;
  dates: string | null;
  stretch: Stretch;
};

export type TermData = {
  term: "Term 1" | "Term 2" | "Term 3" | "Term 4";
  weeks: Week[];
};
