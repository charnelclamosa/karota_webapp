# frozen_string_literal: true

class SimilarAdminUserSerializer < AdminUserListSerializer
<<<<<<< HEAD
  attributes :can_be_suspended, :can_be_silenced
=======
  attributes :can_be_suspended,
             :can_be_silenced
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  def can_be_suspended
    scope.can_suspend?(object)
  end

  def can_be_silenced
    scope.can_silence_user?(object)
  end
end
