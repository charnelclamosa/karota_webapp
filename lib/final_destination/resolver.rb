# frozen_string_literal: true

class FinalDestination::Resolver
  @mutex = Mutex.new
  def self.lookup(addr, timeout: nil)
<<<<<<< HEAD
    timeout ||= default_dns_query_timeout

=======
    timeout ||= 2
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    @mutex.synchronize do
      @result = nil

      @queue ||= Queue.new
<<<<<<< HEAD
=======
      @queue << ""
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      ensure_lookup_thread

      @lookup = addr
      @parent = Thread.current

<<<<<<< HEAD
      # Wakeup the worker thread
      @queue << ""

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      # This sleep will be interrupted by the lookup thread
      # if completed within timeout
      sleep timeout
      if !@result
        @thread.kill
        @thread.join
        @thread = nil
        if @error
          @error.backtrace.push(*caller)
          raise @error
        else
          raise Timeout::Error
        end
      end
      @result
    end
  end

  private

<<<<<<< HEAD
  def self.default_dns_query_timeout
    if gs = GlobalSetting.dns_query_timeout_secs.presence
      Integer(gs)
    else
      2
    end
  end

  def self.ensure_lookup_thread
    return if @thread&.alive?

    @thread =
      Thread.new do
        while true
          @queue.deq
          @error = nil
          begin
            @result = Addrinfo.getaddrinfo(@lookup, 80, nil, :STREAM).map(&:ip_address)
          rescue => e
            @error = e
          end
          @parent.wakeup
        end
      end
=======
  def self.ensure_lookup_thread
    return if @thread&.alive?

    @thread = Thread.new do
      while true
        @queue.deq
        @error = nil
        begin
          @result = Addrinfo.getaddrinfo(@lookup, 80, nil, :STREAM).map(&:ip_address)
        rescue => e
          @error = e
        end
        @parent.wakeup
      end
    end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    @thread.name = "final-destination_resolver_thread"
  end
end
