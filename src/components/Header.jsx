import logoImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="logo quiz" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
