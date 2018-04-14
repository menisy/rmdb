module Api::V1
  class UserTokenController < Knock::AuthTokenController
    before_action :print_params

    def print_params
      Rails.logger.error params
    end
  end
end
