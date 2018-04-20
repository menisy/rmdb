json.pagination do
  json.all_count @all_count
  json.page @page
  json.pages @pages
  json.per @per
end

json.movies do
  json.partial! 'api/v1/movies/movie', collection: @movies, as: :movie
end
