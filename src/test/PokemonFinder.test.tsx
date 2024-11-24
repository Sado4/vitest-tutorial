import { describe, test, expect } from "vitest";
import PokemonFinder from "../components/PokemonFinder";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe(PokemonFinder, () => {
  test("初期レンダリングが正しく行われる", () => {
    render(<PokemonFinder />);
    expect(screen.getByText("ポケモンファインダー")).toBeInTheDocument();
    expect(screen.getByText("ポケモンを見つける")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ポケモンを見つける" })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("ポケモンのIDを入力")
    ).toBeInTheDocument();
  });

  test("ボタンクリックでポケモンデータがフェッチされ、表示される", async () => {
    render(<PokemonFinder />);
    const input = screen.getByPlaceholderText("ポケモンのIDを入力");
    await userEvent.type(input, "25");

    const button = screen.getByRole("button", { name: "ポケモンを見つける" });
    await userEvent.click(button);

    const pokemonName = screen.getByText("pikachu");
    expect(pokemonName).toBeInTheDocument();

    const pokemonImage = screen.getByRole("img");
    expect(pokemonImage).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png"
    );
    expect(pokemonImage).toHaveAttribute("alt", "pikachu");
  });

  test("ポケモンが見つからない場合はエラーメッセージが表示される", async () => {
    render(<PokemonFinder />);
    const input = screen.getByPlaceholderText("ポケモンのIDを入力");
    await userEvent.type(input, "10000");

    const button = screen.getByRole("button", { name: "ポケモンを見つける" });
    await userEvent.click(button);

    const errorMessage = screen.getByText("ポケモンのデータが見つかりません。");
    expect(errorMessage).toBeInTheDocument();
  });
});
