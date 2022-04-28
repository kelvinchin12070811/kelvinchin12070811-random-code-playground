# frozen_string_literal: true

# ======================================================================================================================
# A bogo sort algorithm implementation in ruby
# Bogo sort is a useless algorithm as it take o(n * n!) time to sort an array of n elements. The idea of bogo sort is
# to shuffle the array until it is sorted. Hence, this algorithm is basically useless in classic computer.
# ======================================================================================================================

# Determines if the array is sorted
# @param list [Array<Integer>] Array to sort
# @return [Boolean] True if sorted, false if not
def sorted?(list)
  puts list.each_cons(2) { |a, b| return false if a > b }
  true
end

try_count = 0
list = []
(0...10).each { |i| list << i }
list.shuffle!

puts "Unsorted: #{list}"

until sorted?(list)
  list.shuffle!
  try_count += 1
  print "\rCurrent : #{list}"
end

puts "\nSorted  : #{list}"
puts "\nTries   : #{try_count}"
