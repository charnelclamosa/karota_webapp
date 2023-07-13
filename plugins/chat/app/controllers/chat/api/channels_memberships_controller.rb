# frozen_string_literal: true

class Chat::Api::ChannelsMembershipsController < Chat::Api::ChannelsController
  def index
    params.permit(:username, :offset, :limit)

    offset = params[:offset].to_i
    limit = (params[:limit] || 50).to_i.clamp(1, 50)

    memberships =
      Chat::ChannelMembershipsQuery.call(
        channel: channel_from_params,
        offset: offset,
        limit: limit,
        username: params[:username],
      )

    render_serialized(
      memberships,
      Chat::UserChannelMembershipSerializer,
      root: "memberships",
      meta: {
        total_rows: channel_from_params.user_count,
        load_more_url:
          "/chat/api/channels/#{channel_from_params.id}/memberships?offset=#{offset + limit}&limit=#{limit}&username=#{params[:username]}",
      },
    )
  end
end
