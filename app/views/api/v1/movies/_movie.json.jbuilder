json.(movie, :title, :description,
              :user_id, :average_rating,
              :id, :created_at)

if current_api_v1_user
  json.user_rating current_api_v1_user.rating_for_movie(movie)
else
  0
end

json.category movie.category, :title, :id

json.user movie.user, :nickname
