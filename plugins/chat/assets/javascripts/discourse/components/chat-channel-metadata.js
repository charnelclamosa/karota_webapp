import Component from "@glimmer/component";
<<<<<<< HEAD

export default class ChatChannelMetadata extends Component {
  get unreadIndicator() {
    return this.args.unreadIndicator ?? false;
  }

  get lastMessageFormattedDate() {
    return moment(this.args.channel.lastMessage.createdAt).calendar(null, {
      sameDay: "LT",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "dddd",
      sameElse: "l",
    });
=======
export default class ChatChannelMetadata extends Component {
  unreadIndicator = false;

  get lastMessageFormatedDate() {
    return moment(this.args.channel.get("last_message_sent_at")).calendar(
      null,
      {
        sameDay: "LT",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "dddd",
        sameElse: "l",
      }
    );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
