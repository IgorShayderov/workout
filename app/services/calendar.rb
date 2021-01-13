class Calendar
  include Singleton

  WEEK_DAYS_COUNT = 7
  MONDAY = 1
  SUNDAY = 7

  def collect_calendar_data
    @current_date = Time.zone.now
    @days_in_month = Time.days_in_month(@current_date.month, @current_date.year)

    {
      caption: Time.zone.now.strftime('%d of %B %Y year'),
      days: calendar_representation_days,
      weeks_count: count_weeks
    }
  end

  private

  def count_weeks
    @all_days.length / WEEK_DAYS_COUNT
  end

  def calc_wday_from_monday(wday)
    remainder = (wday - 1) % 7

    remainder.zero? ? remainder : remainder + 1
  end

  def calendar_representation_days
    @all_days = (1..@days_in_month).reduce([]) do |current_month_days, day|
      date_for_day = Time.zone.local(@current_date.year, @current_date.month, day)

      current_month_days.push({
                                day_of_week_num: calc_wday_from_monday(date_for_day.wday),
                                day_of_month_num: day,
                                is_current_day: date_for_day.today?,
                                is_current_month: true
                              })
    end

    unless @all_days.first[:day_of_week_num] == MONDAY
      days_of_prev_month = @all_days.first[:day_of_week_num] - 1
      add_month_days!(:prev, days_of_prev_month)
    end

    unless @all_days.last[:day_of_week_num] == SUNDAY
      days_of_next_month = WEEK_DAYS_COUNT - @all_days.last[:day_of_week_num]
      add_month_days!(:next, days_of_next_month)
    end

    @all_days
  end

  def add_month_days!(month_course = :next, days_of_month)
    day_position = month_course == :prev ? 'first' : 'last'
    arithmetic_operation = month_course == :prev ? '-' : '+'
    array_operation = month_course == :prev ? 'unshift' : 'push'

    day_of_month = Time.zone.local(@current_date.year, @current_date.month, @all_days.send(day_position)[:day_of_month_num])

    (1..days_of_month).each do |day_num|
      @all_days.send(array_operation, {
                       day_of_week_num: day_of_month.wday.send(arithmetic_operation, day_num),
                       day_of_month_num: day_of_month.send(arithmetic_operation, day_num.day).day,
                       is_current_day: false,
                       is_current_month: false
                     })
    end
  end

end
