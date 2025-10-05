export interface Config {
  stage1: {
    passcode: string;
  };
  stage2: {
    riddle: string;
    conversion_table: string;
  };
  stage3: {
    files: string[];
    correct_filename: string;
    file_password: string;
  };
  stage4: {
    quiz: QuizQuestion[];
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctIndex: number;
}
