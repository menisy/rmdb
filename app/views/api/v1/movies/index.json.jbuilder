json.pagination do
  json.page @page
  json.pages @pages
  json.per @per
end

json.movies do
  json.partial! 'api/v1/movies/movie', collection: @movies, as: :movie
end
