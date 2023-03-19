import Eris from "eris"

// Add a fake token and configuration for testing purposes
const FAKE_DISCORD_TOKEN = "fake-token"
describe("Bot", () => {
  let bot: Eris.Client

  beforeAll(() => {
    bot = new Eris.Client(FAKE_DISCORD_TOKEN, {
      intents: ["guildMessages"],
    })
  })

  it("should be an instance of Eris.Client", () => {
    expect(bot).toBeInstanceOf(Eris.Client)
  })
})
